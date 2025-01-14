import { expect, afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';
import * as matchers from '@testing-library/jest-dom/matchers';
import '@testing-library/jest-dom';

// Ensure matchers is not null before extending
expect.extend(matchers);

afterEach(() => {
    cleanup();
});