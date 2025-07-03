import React, { useEffect } from 'react';

const TallyFormEmbed = () => {
  useEffect(() => {
    const widgetScriptSrc = 'https://tally.so/widgets/embed.js';

    const loadTallyEmbed = () => {
      if (window.Tally) {
        window.Tally.loadEmbeds();
      } else {
        document.querySelectorAll('iframe[data-tally-src]:not([src])').forEach((iframe) => {
          iframe.src = iframe.dataset.tallySrc;
        });
      }
    };

    if (!document.querySelector(`script[src="${widgetScriptSrc}"]`)) {
      const script = document.createElement('script');
      script.src = widgetScriptSrc;
      script.async = true;
      script.onload = loadTallyEmbed;
      script.onerror = loadTallyEmbed;
      document.body.appendChild(script);
    } else {
      loadTallyEmbed();
    }
  }, []);

  return (
    <section className="py-16 lg:py-24 bg-muted/30" id="test-section">
      <div className="container mx-auto px-4">
        <iframe
          data-tally-src="https://tally.so/embed/mVXWWN?alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1"
          loading="lazy"
          width="100%"
          height="500"
          title="Tally Form"
          style={{ border: 'none' }}
        />
      </div>
    </section>
  );
};

export default TallyFormEmbed;