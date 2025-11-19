export function separateCodeFromText(text: string): {
    text: string;
    code: string | null;
} {
    const codeBlockRegex = /```[\w-]*\n([\s\S]*?)\n```/;
    const match = text.match(codeBlockRegex);

    if (match) {
        const code = match[1].trim();
        const cleanText = text.replace(codeBlockRegex, '').trim();
        return { text: cleanText || 'Что выведет этот код?', code };
    }

    return { text: text.trim(), code: null };
}