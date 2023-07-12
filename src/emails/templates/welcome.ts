import { baseTemplate } from './base-template';

export function introduction() {
  return baseTemplate(
    `
        <p>
        Hi! Welcome to Flok!
        </p>
        `
  );
}
