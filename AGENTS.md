# Academic webpage maintenance

For every publication, metrics, news or research-highlight update:

- Use the latest available CV and publication data, then verify current Google Scholar, ORCID and publisher records. A selected-publications CV and lower bounds such as “33+” are not a complete bibliography.
- Distinguish the unique works listed on this website from Google Scholar's raw record count. Count a published paper once, excluding its earlier preprint, duplicate records, conference abstracts and datasets. Label remaining arXiv preprints explicitly.
- Verify DOI/title agreement, authorship and author order, venue, year and journal/preprint status before adding or changing a record. Never infer a DOI from its year or article number.
- Keep publication-updates.json, the embedded saved bibliography, static HTML list, headline total, results text and journal/preprint subtotals identical. Keep metrics.json and static metric values identical. Load metric values and their check date as one validated snapshot.
- Set checkedAt only after checking the corresponding source. Use the same readable date format throughout. A reload reads saved website data; it does not query Scholar or publish an update. Do not promise automatic weekly/Monday publication without an active, verified publishing workflow.
- Match every news/highlight image to that item's subject, material, linked source and publication status. Do not recycle unrelated images. Provide specific alt text. Clearly label original conceptual illustrations; never present them as measured data or paper figures. Use publisher figures only when reuse is permitted, with attribution.
- Preserve the design. Check desktop and mobile, filters/search, totals, image/caption/link pairing, and the fallback when JSON loading fails. Save a preview and document sources, mismatches and exact changes.
- When changing JavaScript or stylesheets, refresh the corresponding asset-version references in index.html. Verify a returning visitor can reload without mixing old scripts with a new embedded bibliography.
- Report separately what is prepared or committed locally and what is actually deployed. Never claim a live update from a local commit alone.

## Author identity exclusions confirmed 22 October 2026

Nur confirmed that neither DOI `10.1039/d6dt01729k` (Ni(II) host–guest modelling) nor DOI `10.1021/acs.jpca.6c01569` (Co(II) pesticide recognition) is his paper. Do not add either from Google Scholar: the publisher's Md Nur Hasan has ORCID `0009-0009-7827-7353` and a Bhagalpur chemistry affiliation. Nur's ORCID is `0000-0001-7826-5613`. Scholar's raw profile count and metrics may include these unrelated records; never equate that count to this curated bibliography or silently subtract estimated citations.
