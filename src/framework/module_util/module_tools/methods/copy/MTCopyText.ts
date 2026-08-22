export const MTCopyText = async function (text: string): Promise<void> {
    await navigator.clipboard.writeText(text);
};