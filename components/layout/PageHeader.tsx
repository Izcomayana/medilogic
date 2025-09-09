"use client";

type PageHeaderProps = {
  title: string;
  description?: string;
};

export default function PageHeader({ title, description }: PageHeaderProps) {
  return (
    <div className="px-6 py-4 border-b border-gray-700 bg-gray-800">
      <h1 className="text-2xl font-bold text-white">{title}</h1>
      {description && (
        <p className="text-gray-400 mt-1 text-sm">{description}</p>
      )}
    </div>
  );
}
