export function convertHeadingsToFormat(heading: string): string {
    return `${heading.toLowerCase().replace(/\s/g, '-')}`;
}