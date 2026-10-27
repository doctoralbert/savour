-- Een gestopt abonnement geeft geen Pro meer (2026-10-28)
--
-- Waarom: Stripe zet een abonnement pas op "canceled" als het echt gestopt is (direct opgezegd, terugbetaald of
-- aan het eind van de periode). Bij opzeggen per einddatum blijft de status "active" tot die datum. Savour telde
-- "canceled" toch als lopend tot de oude einddatum, waardoor een gestopt (test)abonnement nog Pro gaf, ook aan
-- de leden van een team. Voortaan telt alleen active, trialing en past_due.
--
-- Uitvoeren: Supabase-dashboard → SQL Editor → dit hele bestand plakken → Run. Veilig om vaker uit te voeren.

begin;

create or replace function public.savour_org_active(_org public.organizations)
returns boolean language sql stable as $$
  select _org.status in ('active', 'trialing', 'past_due')
     and (_org.current_period_end is null or _org.current_period_end > now());
$$;

create or replace function public.savour_paid_pro(_user uuid)
returns boolean language sql stable security definer set search_path = public as $$
  select exists (
      select 1 from public.subscriptions s
      where s.user_id = _user
        and s.status in ('active', 'trialing', 'past_due')
        and (s.current_period_end is null or s.current_period_end > now())
    )
    or exists (
      select 1 from public.organizations o
      where public.savour_org_active(o)
        and (o.owner_id = _user
             or exists (select 1 from public.organization_members m join auth.users u on lower(u.email) = lower(m.email)
                        where m.organization_id = o.id and u.id = _user))
    );
$$;

commit;
