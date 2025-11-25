import { format, parseISO, startOfMonth, endOfMonth, isWithinInterval } from "date-fns";

export const formatDate = (date: string | Date): string => {
    const dateObj = typeof date === "string" ? parseISO(date) : date;
    return format(dateObj, "MMM dd, yyyy");
};

export const formatDateTime = (date: string | Date): string => {
    const dateObj = typeof date === "string" ? parseISO(date) : date;
    return format(dateObj, "MMM dd, yyyy HH:mm");
};

export const getCurrentMonthRange = () => {
    const now = new Date();
    return {
        start: startOfMonth(now),
        end: endOfMonth(now),
    };
};

export const isDateInRange = (date: string | Date, start: string | Date, end: string | Date): boolean => {
    const dateObj = typeof date === "string" ? parseISO(date) : date;
    const startObj = typeof start === "string" ? parseISO(start) : start;
    const endObj = typeof end === "string" ? parseISO(end) : end;

    return isWithinInterval(dateObj, { start: startObj, end: endObj });
};
