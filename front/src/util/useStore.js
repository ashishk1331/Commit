import { create } from "zustand";

export const useStore = create((set, get) => ({
    // tasks related functions
    tasks: [],
    addTask: (task) => set((prev) => ({ tasks: [task, ...prev.tasks] })),
    removeTask: (task) =>
        set((prev) => ({ tasks: prev.tasks.filter((t) => t.id !== task.id) })),
    setTasks: (tasks) =>
        set((prev) => {
            return {
                tasks: tasks.map((task) => {
                    if (task.finished === undefined) {
                        task.finished = false;
                    }
                    return task;
                }),
            };
        }),
    resetTasks: () => set((prev) => ({ tasks: [] })),
    finished: (id) =>
        set((prev) => {
            let finished = false;

            for (let i = 0; i < prev.tasks; i++) {
                if (prev.tasks[i].id === id) {
                    let newValue = !prev.tasks[i].finished;
                    prev.tasks[i].finished = newValue;
                    finished = newValue;
                }
            }

            let score = get().score;
            if (finished) {
                score += 1;
            } else {
                score -= 1;
            }

            return {
                tasks: prev.tasks,
                score,
            };
        }),

    // daily score card
    score: 0,
    setScore: (score) =>
        set((prev) => {
            prev.days[0] = score + 1;
            return { score, days: prev.days };
        }),
    resetScore: () =>
        set((prev) => {
            prev.days[0] = 0;
            return { score: 0, days: prev.days };
        }),
    incScore: () =>
        set((prev) => {
            prev.days[0] += 1;
            return { score: prev.score + 1, days: prev.days };
        }),
    decScore: () =>
        set((prev) => {
            prev.days[0] -= 1;
            return { score: prev.score - 1, days: prev.days };
        }),

    // heatmap data
    days: [],
    setDays: (days) => set((prev) => ({ days })),
    resetDays: () => set((prev) => ({ days: [] })),
    addToday: (score) =>
        set((prev) => ({
            days: [score > prev.score ? score : prev.score, ...prev.days],
        })),

    // user related functions
    user: null,
    lastLoggedIn: new Date().toJSON(),
    setLogin: (date) => set((prev) => ({ lastLoggedIn: date })),
    setUser: (user) => set((prev) => ({ user })),
}));
