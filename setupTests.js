import { cleanup, render, screen } from "@testing-library/react";
import { it, describe, vi, expect } from 'vitest';
import '@testing-library/jest-dom';

global.it = it;
global.describe = describe;
global.vi = vi;
global.expect = expect;
global.render = render;
global.screen = screen;

afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
});