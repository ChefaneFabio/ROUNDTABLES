# 📅 Calendar View Implementation

## Overview
A comprehensive calendar/timeline view for managing sessions across multiple roundtables, inspired by the Hyundai roundtables tracking spreadsheet.

## Implementation Date
October 15, 2025

---

## ✅ Features Implemented

### 1. **Backend API** (`/api/sessions/calendar-view`)

**Endpoint**: `GET /api/sessions/calendar-view`

**Query Parameters**:
- `roundtableIds`: Comma-separated list or array of roundtable IDs
- `startDate`: ISO date string (filters sessions >= this date)
- `endDate`: ISO date string (filters sessions <= this date)
- `groupBy`: Grouping strategy (default: 'roundtable')

**Response Structure**:
```json
{
  "success": true,
  "data": {
    "groups": [
      {
        "roundtable": {
          "id": "...",
          "name": "Hyundai GROUP 2",
          "status": "IN_PROGRESS",
          "client": { "name": "...", "company": "..." }
        },
        "sessions": [
          {
            "id": "...",
            "sessionNumber": 1,
            "scheduledAt": "2025-07-16T11:00:00Z",
            "status": "SCHEDULED",
            "workflowStatus": "questions_requested",
            "topic": { "title": "Motivating the..." },
            "trainer": { "name": "JEAN", "email": "..." },
            "questionsCount": 3,
            "feedbackCount": 0
          }
        ]
      }
    ],
    "totalSessions": 45,
    "dateRange": {
      "start": "2025-07-01T00:00:00Z",
      "end": "2025-07-31T23:59:59Z"
    }
  }
}
```

**Workflow Status Calculation**:
The endpoint automatically calculates `workflowStatus` for each session based on session status and questions/feedback presence:

- `scheduled`: Initial state, no actions yet
- `questions_requested`: Trainer reminder sent (`REMINDER_SENT` or `QUESTIONS_REQUESTED`)
- `questions_sent`: Questions approved and sent to students (`QUESTIONS_READY` with approved questions)
- `feedback_requested`: Session completed, waiting for trainer feedback (`COMPLETED` or `FEEDBACK_PENDING`)
- `feedback_sent`: Feedback approved and sent to students (`FEEDBACK_SENT` or has approved feedback)

**File**: `backend/src/controllers/sessionController.ts` (lines 118-236)

---

### 2. **Frontend CalendarViewPage**

**Route**: `/calendar`

**File**: `frontend/src/pages/CalendarViewPage.tsx`

#### **Key Features**:

1. **Multi-Roundtable Filtering**
   - Modal-based roundtable selector
   - Multi-select checkboxes
   - Shows roundtable name, client, and status
   - Displays selection count
   - "Clear All" and "Apply Filter" buttons

2. **Month Navigation**
   - Previous/Next month buttons
   - Current month display
   - Automatic date range calculation

3. **View Modes**
   - **Grid View**: Sessions displayed as cards in a grid
   - **List View**: Sessions in a linear list format
   - Toggle button for switching views

4. **Color-Coded Workflow Status** (matching spreadsheet):
   - 🟣 **Pink** (`bg-pink-100 border-pink-300`): Questions requested to trainer
   - 🔵 **Blue** (`bg-blue-100 border-blue-300`): Questions sent to students
   - 🟠 **Orange** (`bg-orange-100 border-orange-300`): Feedback requested from trainer
   - 🟡 **Yellow** (`bg-yellow-100 border-yellow-300`): Feedback sent to students
   - ⚪ **Gray** (`bg-gray-100 border-gray-300`): Scheduled (no action yet)

5. **Session Cards Display**:
   - Session number (1-10)
   - Topic title
   - Date and time
   - Trainer name
   - Workflow status label
   - Click to view session details

6. **Workflow Legend**
   - Visual color key
   - Descriptive labels
   - Helps users understand status colors

7. **Grouping by Roundtable**
   - Sessions grouped by roundtable
   - Roundtable header with client info
   - Empty state handling

8. **Export Functionality** (UI prepared, backend pending)
   - "Export" button ready for PDF/Excel export

---

## 📂 Files Modified/Created

### **Backend**:
- ✅ `backend/src/controllers/sessionController.ts` - Added `/calendar-view` endpoint

### **Frontend**:
- ✅ `frontend/src/pages/CalendarViewPage.tsx` - New calendar view page
- ✅ `frontend/src/App.tsx` - Added `/calendar` route and import
- ✅ `frontend/src/pages/DashboardPage.tsx` - Added "Calendar View" quick action

---

## 🎨 UI/UX Design

### **Layout Structure**:
```
┌─────────────────────────────────────────────────────────────┐
│  Navigation Bar                                             │
├─────────────────────────────────────────────────────────────┤
│  Header: "Session Calendar"                                 │
│  [Filter] [Grid/List Toggle] [Export]                       │
├─────────────────────────────────────────────────────────────┤
│  Month Navigation: [<] July 2025 [>]                        │
├─────────────────────────────────────────────────────────────┤
│  Workflow Status Legend (color key)                         │
├─────────────────────────────────────────────────────────────┤
│  ┌───────────────────────────────────────────────────────┐  │
│  │ GROUP 2 - Hyundai                                     │  │
│  ├───────────────────────────────────────────────────────┤  │
│  │ [Session 1] [Session 2] [Session 3] [Session 4]       │  │
│  │ [Session 5] [Session 6] [Session 7] [Session 8]       │  │
│  └───────────────────────────────────────────────────────┘  │
│  ┌───────────────────────────────────────────────────────┐  │
│  │ GROUP 3 + DWB/L - Hyundai                             │  │
│  ├───────────────────────────────────────────────────────┤  │
│  │ [Session 1] [Session 2] [Session 3] [Session 4]       │  │
│  └───────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

### **Session Card** (Grid View):
```
┌─────────────────────────┐
│ Session 2      Jul 23   │ ← Pink border (Questions Requested)
│                         │
│ Motivating the Team     │
│                         │
│ 🗓️ 11:00               │
│ 👤 JEAN                 │
│                         │
│ Questions Requested     │
└─────────────────────────┘
```

---

## 🔄 Workflow Matching Spreadsheet

The calendar view replicates the workflow tracking from the Hyundai spreadsheet:

| Spreadsheet Color | System Status | Meaning |
|------------------|---------------|---------|
| Pink/Purple | `questions_requested` | TOPIC QUESTIONS AS To Trainer |
| Light Blue | `questions_sent` | TOPIC QUESTIONS SE To Students |
| Orange/Red | `feedback_requested` | FEEDBACK REQUEST To Trainer |
| Yellow | `feedback_sent` | FEEDBACK SENT To Students |

---

## 🚀 Usage Instructions

### **For Coordinators**:

1. **Navigate to Calendar**:
   - Click "Calendar View" from Dashboard quick actions
   - Or navigate to `/calendar` from the menu

2. **Filter Roundtables**:
   - Click "Filter" button
   - Select/deselect roundtables
   - Click "Apply Filter"

3. **Navigate Months**:
   - Use `<` and `>` buttons to change months
   - View sessions for selected date range

4. **View Session Details**:
   - Click any session card
   - Opens session details page

5. **Switch View Modes**:
   - Click Grid icon for card view
   - Click List icon for linear view

---

## 🔧 Technical Details

### **Data Flow**:

1. **Frontend State Management**:
   - `selectedRoundtableIds`: Array of selected roundtable IDs
   - `currentMonth`: Date object for month navigation
   - `calendarData`: Response from API
   - `viewMode`: 'grid' | 'list'

2. **API Integration**:
   - Uses Axios for HTTP requests
   - Automatic date range calculation based on `currentMonth`
   - Refetches data when filters or month changes

3. **Responsive Design**:
   - Grid: 1 column (mobile) → 4 columns (desktop)
   - List: Full-width rows
   - Tablet-optimized breakpoints

4. **Performance**:
   - Filters by date range to limit data
   - Default limit: 5 roundtables initially
   - Efficient re-renders with React hooks

---

## 🎯 Benefits

### **vs. Manual Spreadsheet**:
✅ **Real-time Data**: Always up-to-date with database
✅ **Automated Status**: Workflow status calculated automatically
✅ **Scalable**: Handle 50+ roundtables effortlessly
✅ **Interactive**: Click to view/edit session details
✅ **Filtered Views**: Show only relevant roundtables
✅ **No Manual Coloring**: Status colors update automatically
✅ **Multi-Month**: Easy navigation across months

### **Integration with Automation**:
- Workflow status updates automatically via scheduled jobs
- No manual tracking needed
- Consistent with the 13 automated jobs in `scheduler.ts`

---

## 📊 Example Use Cases

### **Use Case 1: Weekly Review**
Coordinator wants to review all sessions for the current week across 5 active roundtables:
1. Select 5 roundtables from filter
2. Navigate to current month
3. See all sessions color-coded by workflow status
4. Identify sessions needing attention (pink = trainer hasn't submitted questions)

### **Use Case 2: Trainer Workload**
Check how many sessions a specific trainer has:
1. Open calendar view
2. Scan cards for trainer name
3. Count sessions visually
4. *(Future: Add trainer filter)*

### **Use Case 3: Client Report**
Generate overview for a specific client:
1. Filter to show only that client's roundtables
2. Export to PDF *(pending implementation)*
3. Send to client for review

---

## 🔮 Future Enhancements

### **Planned Features**:

1. **Export to PDF/Excel**
   - Generate printable calendar
   - Excel export for offline tracking

2. **Trainer Filtering**
   - Filter sessions by trainer name
   - See trainer workload distribution

3. **Week View**
   - More detailed weekly timeline
   - Hourly breakdown

4. **Custom Groups**
   - Save roundtable filter combinations
   - Quick access to "My Groups"

5. **Drag-and-Drop Reschedule**
   - Drag session to new date
   - Automatically send reschedule notifications

6. **Session Status Actions**
   - Quick actions directly from calendar cards
   - Mark as completed, request questions, etc.

7. **Real-time Updates**
   - WebSocket integration
   - Live status updates without refresh

8. **Mobile App**
   - Native mobile view
   - Swipe gestures for month navigation

---

## ✅ Validation Status

- ✅ **Backend TypeScript**: No compilation errors
- ✅ **Frontend TypeScript**: No compilation errors
- ✅ **Route Integration**: `/calendar` route active
- ✅ **Navigation**: Added to Dashboard quick actions
- ✅ **API Endpoint**: Tested and functional
- ✅ **Color Coding**: Matches spreadsheet workflow
- ✅ **Responsive Design**: Works on all screen sizes

---

## 🎓 Learning Resources

### **For Developers Extending This Feature**:

1. **Backend Endpoint**: `backend/src/controllers/sessionController.ts:118-236`
2. **Frontend Component**: `frontend/src/pages/CalendarViewPage.tsx`
3. **Workflow Status Logic**: See `workflowStatus` calculation in endpoint
4. **Color Mapping**: `getWorkflowColor()` function in CalendarViewPage

### **Key Concepts**:
- Multi-roundtable filtering with state management
- Date range calculations
- Workflow status derivation from session data
- Color-coded status visualization
- Modal-based filtering UI

---

## 📝 Notes

- Default behavior: Shows up to 5 active roundtables on initial load
- Date range: Automatically filters to current month ± buffer
- Empty states: Handled gracefully with user guidance
- Navigation: Consistent with existing app navigation patterns
- Security: Protected route (requires authentication)

---

**Implementation completed successfully!** 🎉

The calendar view provides a powerful alternative to manual spreadsheet tracking, with real-time data, automated status updates, and an intuitive interface that matches the existing workflow.
