import { describe, expect, it, Mock, vi } from "vitest"
import { Status, Store, Task, useStore } from "../zustand/store"
import { FC, useEffect } from "react";
import { render } from "@testing-library/react";


interface TestComponentProps {
    effect: Mock<(item: Array<Task>) => void>;
    store?: (store: Store) => Array<Task>;
    multiple?(store: Store): {
        task: Array<Task>;
        addTask: (id: string, title: string, status: Status) => void;
    };
}

const TestComponent: FC<TestComponentProps> = ({ effect, store }) => {
    const items = useStore(store || (store => store.tasks));

    useEffect(() => {
        effect(items);
    }, [items, effect]);

    return null
}

describe('Check Zustand Store', () => {
    it("should return default value in the start", () => {
        const selector = (store: Store) => store.tasks
        const effect = vi.fn()

        render(<TestComponent store={selector} effect={effect} />)

        expect(effect).toHaveBeenCalledWith([])
    })

    it("should add a task and return the added value", () => {
        const selector = (store: Store) => ({ task: store.tasks, addTask: store.addTask })
        const effect = vi.fn().mockImplementation((items: Store) => {
            if (items.tasks?.length === 0) {
                items.addTask("1", "Task 1", "PLANNED")
            }
        })

        render(<TestComponent multiple={selector} effect={effect} />)

        expect(effect).toHaveBeenCalledTimes(1)
    })

})