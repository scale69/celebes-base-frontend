1. redaksi ✅
2. iklan ( size iklan di perbesar dan berita di perkecil ) ✅
3. iklan ( filter berdasarkan category saja ) ✅
4. share whatspapp tamabahkan opengraph ✅
5. share button ✅
6. print button ✅
7. fix loading ✅

ini script di layotu dalam body
{/_ <script
type="application/ld+json"
dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "CELEBES SULTRA",
              "url": "https://celebessultra.com",
              "potentialAction": {
                "@type": "SearchAction",
                "target": "https://celebessultra.com/search?q={search_term_string}",
                "query-input": "required name=search_term_string"
              },
              "publisher": {
                "@type": "Organization",
                "name": "CELEBES SULTRA",
                "logo": {
                  "@type": "ImageObject",
                  "url": "https://celebessultra.com/logo.png"
                }
              }
            })
          }}
/> _/}
