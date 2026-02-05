import axios from 'axios';
import { MeetingProvider } from '@prisma/client';

interface MeetingDetails {
  provider: MeetingProvider;
  meetingId: string;
  joinUrl: string;
  hostUrl?: string;
  password?: string;
  startTime: Date;
  duration: number; // minutes
  topic: string;
}

interface MeetingConfig {
  provider: MeetingProvider;
  topic: string;
  startTime: Date;
  duration: number;
  hostEmail?: string;
  agenda?: string;
}

// Environment variables for API credentials
const ZOOM_CLIENT_ID = process.env.ZOOM_CLIENT_ID;
const ZOOM_CLIENT_SECRET = process.env.ZOOM_CLIENT_SECRET;
const ZOOM_ACCOUNT_ID = process.env.ZOOM_ACCOUNT_ID;

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const GOOGLE_REFRESH_TOKEN = process.env.GOOGLE_REFRESH_TOKEN;

const TEAMS_CLIENT_ID = process.env.TEAMS_CLIENT_ID;
const TEAMS_CLIENT_SECRET = process.env.TEAMS_CLIENT_SECRET;
const TEAMS_TENANT_ID = process.env.TEAMS_TENANT_ID;

export class VideoConferencingService {
  private static zoomAccessToken: string | null = null;
  private static zoomTokenExpiry: Date | null = null;

  private static googleAccessToken: string | null = null;
  private static googleTokenExpiry: Date | null = null;

  private static teamsAccessToken: string | null = null;
  private static teamsTokenExpiry: Date | null = null;

  // ============================================
  // ZOOM INTEGRATION
  // ============================================

  private static async getZoomAccessToken(): Promise<string> {
    if (this.zoomAccessToken && this.zoomTokenExpiry && this.zoomTokenExpiry > new Date()) {
      return this.zoomAccessToken;
    }

    if (!ZOOM_CLIENT_ID || !ZOOM_CLIENT_SECRET || !ZOOM_ACCOUNT_ID) {
      throw new Error('Zoom API credentials not configured');
    }

    const credentials = Buffer.from(`${ZOOM_CLIENT_ID}:${ZOOM_CLIENT_SECRET}`).toString('base64');

    const response = await axios.post(
      'https://zoom.us/oauth/token',
      new URLSearchParams({
        grant_type: 'account_credentials',
        account_id: ZOOM_ACCOUNT_ID,
      }),
      {
        headers: {
          Authorization: `Basic ${credentials}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    );

    this.zoomAccessToken = response.data.access_token;
    this.zoomTokenExpiry = new Date(Date.now() + (response.data.expires_in - 60) * 1000);

    return this.zoomAccessToken!;
  }

  static async createZoomMeeting(config: MeetingConfig): Promise<MeetingDetails> {
    const accessToken = await this.getZoomAccessToken();

    const response = await axios.post(
      'https://api.zoom.us/v2/users/me/meetings',
      {
        topic: config.topic,
        type: 2, // Scheduled meeting
        start_time: config.startTime.toISOString(),
        duration: config.duration,
        timezone: 'UTC',
        agenda: config.agenda || '',
        settings: {
          host_video: true,
          participant_video: true,
          join_before_host: false,
          mute_upon_entry: true,
          watermark: false,
          use_pmi: false,
          approval_type: 2, // No registration required
          audio: 'both',
          auto_recording: 'cloud',
          waiting_room: true,
        },
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      }
    );

    return {
      provider: MeetingProvider.ZOOM,
      meetingId: response.data.id.toString(),
      joinUrl: response.data.join_url,
      hostUrl: response.data.start_url,
      password: response.data.password,
      startTime: new Date(response.data.start_time),
      duration: response.data.duration,
      topic: response.data.topic,
    };
  }

  static async deleteZoomMeeting(meetingId: string): Promise<void> {
    const accessToken = await this.getZoomAccessToken();

    await axios.delete(`https://api.zoom.us/v2/meetings/${meetingId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  }

  static async getZoomRecording(meetingId: string): Promise<string | null> {
    try {
      const accessToken = await this.getZoomAccessToken();

      const response = await axios.get(
        `https://api.zoom.us/v2/meetings/${meetingId}/recordings`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (response.data.recording_files && response.data.recording_files.length > 0) {
        // Return the shared screen with speaker view recording if available
        const recording = response.data.recording_files.find(
          (r: any) => r.recording_type === 'shared_screen_with_speaker_view'
        ) || response.data.recording_files[0];

        return recording.download_url || recording.play_url;
      }

      return null;
    } catch (error) {
      console.error('Failed to get Zoom recording:', error);
      return null;
    }
  }

  // ============================================
  // GOOGLE MEET INTEGRATION
  // ============================================

  private static async getGoogleAccessToken(): Promise<string> {
    if (this.googleAccessToken && this.googleTokenExpiry && this.googleTokenExpiry > new Date()) {
      return this.googleAccessToken;
    }

    if (!GOOGLE_CLIENT_ID || !GOOGLE_CLIENT_SECRET || !GOOGLE_REFRESH_TOKEN) {
      throw new Error('Google API credentials not configured');
    }

    const response = await axios.post(
      'https://oauth2.googleapis.com/token',
      new URLSearchParams({
        client_id: GOOGLE_CLIENT_ID,
        client_secret: GOOGLE_CLIENT_SECRET,
        refresh_token: GOOGLE_REFRESH_TOKEN,
        grant_type: 'refresh_token',
      }),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    );

    this.googleAccessToken = response.data.access_token;
    this.googleTokenExpiry = new Date(Date.now() + (response.data.expires_in - 60) * 1000);

    return this.googleAccessToken!;
  }

  static async createGoogleMeetEvent(config: MeetingConfig): Promise<MeetingDetails> {
    const accessToken = await this.getGoogleAccessToken();

    const endTime = new Date(config.startTime.getTime() + config.duration * 60000);

    // Create a Google Calendar event with Google Meet conference
    const response = await axios.post(
      'https://www.googleapis.com/calendar/v3/calendars/primary/events',
      {
        summary: config.topic,
        description: config.agenda || '',
        start: {
          dateTime: config.startTime.toISOString(),
          timeZone: 'UTC',
        },
        end: {
          dateTime: endTime.toISOString(),
          timeZone: 'UTC',
        },
        conferenceData: {
          createRequest: {
            requestId: `lesson-${Date.now()}`,
            conferenceSolutionKey: {
              type: 'hangoutsMeet',
            },
          },
        },
        attendees: config.hostEmail ? [{ email: config.hostEmail }] : [],
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        params: {
          conferenceDataVersion: 1,
        },
      }
    );

    const meetLink = response.data.conferenceData?.entryPoints?.find(
      (ep: any) => ep.entryPointType === 'video'
    )?.uri;

    if (!meetLink) {
      throw new Error('Failed to create Google Meet link');
    }

    return {
      provider: MeetingProvider.GOOGLE_MEET,
      meetingId: response.data.id,
      joinUrl: meetLink,
      hostUrl: meetLink, // Same link for host and participants
      startTime: new Date(response.data.start.dateTime),
      duration: config.duration,
      topic: response.data.summary,
    };
  }

  static async deleteGoogleMeetEvent(eventId: string): Promise<void> {
    const accessToken = await this.getGoogleAccessToken();

    await axios.delete(
      `https://www.googleapis.com/calendar/v3/calendars/primary/events/${eventId}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
  }

  // ============================================
  // MICROSOFT TEAMS INTEGRATION
  // ============================================

  private static async getTeamsAccessToken(): Promise<string> {
    if (this.teamsAccessToken && this.teamsTokenExpiry && this.teamsTokenExpiry > new Date()) {
      return this.teamsAccessToken;
    }

    if (!TEAMS_CLIENT_ID || !TEAMS_CLIENT_SECRET || !TEAMS_TENANT_ID) {
      throw new Error('Microsoft Teams API credentials not configured');
    }

    const response = await axios.post(
      `https://login.microsoftonline.com/${TEAMS_TENANT_ID}/oauth2/v2.0/token`,
      new URLSearchParams({
        client_id: TEAMS_CLIENT_ID,
        client_secret: TEAMS_CLIENT_SECRET,
        scope: 'https://graph.microsoft.com/.default',
        grant_type: 'client_credentials',
      }),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    );

    this.teamsAccessToken = response.data.access_token;
    this.teamsTokenExpiry = new Date(Date.now() + (response.data.expires_in - 60) * 1000);

    return this.teamsAccessToken!;
  }

  static async createTeamsMeeting(config: MeetingConfig, userId: string): Promise<MeetingDetails> {
    const accessToken = await this.getTeamsAccessToken();

    const endTime = new Date(config.startTime.getTime() + config.duration * 60000);

    // Create an online meeting
    const response = await axios.post(
      `https://graph.microsoft.com/v1.0/users/${userId}/onlineMeetings`,
      {
        subject: config.topic,
        startDateTime: config.startTime.toISOString(),
        endDateTime: endTime.toISOString(),
        lobbyBypassSettings: {
          scope: 'organization',
          isDialInBypassEnabled: true,
        },
        allowedPresenters: 'organizer',
        isEntryExitAnnounced: true,
        allowMeetingChat: 'enabled',
        allowTeamworkReactions: true,
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      }
    );

    return {
      provider: MeetingProvider.MICROSOFT_TEAMS,
      meetingId: response.data.id,
      joinUrl: response.data.joinWebUrl,
      hostUrl: response.data.joinWebUrl,
      startTime: new Date(response.data.startDateTime),
      duration: config.duration,
      topic: response.data.subject,
    };
  }

  static async deleteTeamsMeeting(meetingId: string, userId: string): Promise<void> {
    const accessToken = await this.getTeamsAccessToken();

    await axios.delete(
      `https://graph.microsoft.com/v1.0/users/${userId}/onlineMeetings/${meetingId}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
  }

  // ============================================
  // UNIFIED INTERFACE
  // ============================================

  static async createMeeting(config: MeetingConfig, options?: { teamsUserId?: string }): Promise<MeetingDetails> {
    switch (config.provider) {
      case MeetingProvider.ZOOM:
        return this.createZoomMeeting(config);

      case MeetingProvider.GOOGLE_MEET:
        return this.createGoogleMeetEvent(config);

      case MeetingProvider.MICROSOFT_TEAMS:
        if (!options?.teamsUserId) {
          throw new Error('Teams user ID required for creating Teams meetings');
        }
        return this.createTeamsMeeting(config, options.teamsUserId);

      case MeetingProvider.CUSTOM:
        // For custom meetings, return empty details (user provides their own link)
        return {
          provider: MeetingProvider.CUSTOM,
          meetingId: '',
          joinUrl: '',
          startTime: config.startTime,
          duration: config.duration,
          topic: config.topic,
        };

      default:
        throw new Error(`Unsupported meeting provider: ${config.provider}`);
    }
  }

  static async deleteMeeting(
    provider: MeetingProvider,
    meetingId: string,
    options?: { teamsUserId?: string }
  ): Promise<void> {
    switch (provider) {
      case MeetingProvider.ZOOM:
        await this.deleteZoomMeeting(meetingId);
        break;

      case MeetingProvider.GOOGLE_MEET:
        await this.deleteGoogleMeetEvent(meetingId);
        break;

      case MeetingProvider.MICROSOFT_TEAMS:
        if (!options?.teamsUserId) {
          throw new Error('Teams user ID required for deleting Teams meetings');
        }
        await this.deleteTeamsMeeting(meetingId, options.teamsUserId);
        break;

      case MeetingProvider.CUSTOM:
        // Nothing to delete for custom meetings
        break;
    }
  }

  static async getRecording(provider: MeetingProvider, meetingId: string): Promise<string | null> {
    switch (provider) {
      case MeetingProvider.ZOOM:
        return this.getZoomRecording(meetingId);

      case MeetingProvider.GOOGLE_MEET:
      case MeetingProvider.MICROSOFT_TEAMS:
        // Google Meet and Teams recordings need different handling
        // They're typically stored in Drive/OneDrive
        return null;

      default:
        return null;
    }
  }

  // ============================================
  // CONFIGURATION HELPERS
  // ============================================

  static isProviderConfigured(provider: MeetingProvider): boolean {
    switch (provider) {
      case MeetingProvider.ZOOM:
        return !!(ZOOM_CLIENT_ID && ZOOM_CLIENT_SECRET && ZOOM_ACCOUNT_ID);

      case MeetingProvider.GOOGLE_MEET:
        return !!(GOOGLE_CLIENT_ID && GOOGLE_CLIENT_SECRET && GOOGLE_REFRESH_TOKEN);

      case MeetingProvider.MICROSOFT_TEAMS:
        return !!(TEAMS_CLIENT_ID && TEAMS_CLIENT_SECRET && TEAMS_TENANT_ID);

      case MeetingProvider.CUSTOM:
        return true; // Custom is always available

      default:
        return false;
    }
  }

  static getConfiguredProviders(): MeetingProvider[] {
    return Object.values(MeetingProvider).filter(
      provider => this.isProviderConfigured(provider)
    );
  }
}

export default VideoConferencingService;
