type FeatureHighlightProps = {
  title: string;
  subtitle: string;
};

function FeatureHighlight({ title, subtitle }: FeatureHighlightProps) {
  return (
    <div className="bg-white/70 backdrop-blur-sm p-3 md:p-4 rounded-lg shadow-sm">
      <h3 className="font-semibold mb-1 md:mb-2 text-sm md:text-base">
        {title}
      </h3>
      <p className="text-xs md:text-sm text-blue-600/80">{subtitle}</p>
    </div>
  );
}

export default FeatureHighlight;
