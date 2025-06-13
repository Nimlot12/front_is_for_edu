import { useState } from "react";
import WeekSchedule from "./WeekSchedule";


const Schedule_component = () => {
    const [currentWeekStart, setCurrentWeekStart] = useState(new Date("2023-10-23"));
    const navigateWeek = (direction) => {
        const newDate = new Date(currentWeekStart);
        newDate.setDate(newDate.getDate() + direction * 7);
        setCurrentWeekStart(newDate);
    };
    return(
        <main className="main-content schedule-management">
            <header className="main-header">
                <div className="schedule-header">
                    <button id="prevWeek" className="week-nav-btn" onClick={() => navigateWeek(-1)}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M15 18l-6-6 6-6"></path>
                        </svg>
                    </button>
                    <h1 id="weekRangeTitle">{currentWeekStart.toLocaleDateString("ru-RU")} - {new Date(currentWeekStart.getTime() + 6 * 24 * 60 * 60 * 1000).toLocaleDateString("ru-RU")}</h1>
                    <button id="nextWeek" class="week-nav-btn" onClick={() => navigateWeek(1)}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M9 18l6-6-6-6"></path>
                        </svg>
                    </button>
                </div>
            </header>
                <div className="week-schedule">
                    <div id="weekScheduleWorkdays" className="week-schedule-row">
                        <WeekSchedule currentWeekStart={currentWeekStart} />
                    </div>
                    <div id="weekScheduleWeekend" className="week-schedule-row weekend-row">
                        
                    </div>
                </div>
        </main>
    );
};
export default Schedule_component;