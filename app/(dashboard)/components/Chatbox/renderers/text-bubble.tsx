'use client';

interface TextBubbleProps {
  content: string;
}

export function TextBubble({ content }: TextBubbleProps) {
  // Simple markdown-lite rendering: links and line breaks
  const renderContent = (text: string) => {
    const urlPattern = /(https?:\/\/[^\s]+)/g;
    const parts = text.split(urlPattern);

    return parts.map((part, idx) => {
      if (urlPattern.test(part)) {
        return (
          <a
            key={idx}
            href={part}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-300 underline hover:text-blue-200"
          >
            {part}
          </a>
        );
      }
      return (
        <span key={idx} className="whitespace-pre-wrap">
          {part}
        </span>
      );
    });
  };

  return (
    <div className="bg-gray-700 text-gray-100 rounded-lg p-2 text-sm">
      {renderContent(content)}
    </div>
  );
}
