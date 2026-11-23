-- Vindbaarheid volgen (/admin → Zoekmachines en het dagrapport): elke nacht haalt de server de cijfers van Google Search
-- Console en Bing Webmaster Tools op (api/_lib/zoekmachines.js) en bewaart ze hier. Zo blijft de geschiedenis staan,
-- ook na de 16 maanden van Google en de 6 maanden van Bing, en zie je trends.
-- Alleen de server (service-role) leest en schrijft; gebruikers kunnen er nooit bij (zelfde opzet als admin_settings).
-- Land: tweeletterige code (nl, de, ...). Bing geeft geen landen: daar staat ''.

create table if not exists public.seo_daily (
  day date not null,
  source text not null check (source in ('google', 'bing')),
  country text not null default '',
  clicks integer not null default 0,
  impressions integer not null default 0,
  position numeric, -- gemiddelde positie (Google); bij Bing leeg
  fetched_at timestamptz not null default now(),
  primary key (day, source, country)
);

-- Zoektermen ('query') en pagina's ('page') per dag. Bing geeft deze per week: dan is day het begin van die week.
create table if not exists public.seo_items (
  day date not null,
  source text not null check (source in ('google', 'bing')),
  kind text not null check (kind in ('query', 'page')),
  country text not null default '',
  item text not null,
  clicks integer not null default 0,
  impressions integer not null default 0,
  position numeric, -- Google: gemiddelde positie; Bing: zoals Bing het geeft (AvgImpressionPosition)
  fetched_at timestamptz not null default now(),
  primary key (day, source, kind, country, item)
);
create index if not exists seo_items_day on public.seo_items (day);

alter table public.seo_daily enable row level security;
alter table public.seo_items enable row level security;
revoke all on public.seo_daily from anon, authenticated;
revoke all on public.seo_items from anon, authenticated;
