# Top Judo Lindeweerd (proof of concept)

Een clubsite voor een **fictieve** judo-talentorganisatie, gebouwd met Claude Code.
Doel: laten zien dat een moderne, snelle en goed te beheren clubsite met AI te bouwen is.
Alle namen, clubs en gegevens zijn verzonnen. Er staan geen echte persoonsgegevens in.

- **Astro 5** (statische site), gewone CSS met CSS-variabelen
- **Decap CMS** op `/admin` voor nieuws, clubs, trainingen, lidmaatschappen en het team
- **Tweetalig**: Nederlands op `/`, Engels op `/en/`
- **Geen tracking, geen cookies**, geen externe scripts op de publieke site
- Lettertype **Open Sans**, zelf gehost via `@fontsource/open-sans` (geen verbinding met Google)
- Opbouw en kleuren gebaseerd op de ontwerp-mock-up; alle inhoud is fictief

---

## Lokaal draaien

Je hebt Node.js 22 of nieuwer nodig.

```bash
npm install
npm run dev
```

De site draait dan op http://localhost:4321.

### Het CMS lokaal testen (zonder inloggen)

Start in een tweede terminal:

```bash
npm run cms
```

Open daarna http://localhost:4321/admin/index.html en klik op **Inloggen** (lokaal is geen wachtwoord nodig).
Wijzigingen worden direct in je lokale bestanden opgeslagen.
Lokaal moet je `index.html` achter het adres zetten. Op Netlify werkt gewoon `/admin/`.

### Bouwen

```bash
npm run build
```

De statische site komt in `dist/`.

---

## Deployen op Netlify

1. Log in op [app.netlify.com](https://app.netlify.com) en kies **Add new site → Import an existing project**.
2. Koppel GitHub en kies deze repository.
3. De instellingen worden uit `netlify.toml` gelezen (build: `npm run build`, map: `dist`). Klik op **Deploy**.
4. Zet het CMS-inloggen aan:
   1. Ga naar **Project configuration → Identity** en klik op **Enable Identity**.
   2. Zet bij **Registration** de optie op **Invite only**, zodat niet iedereen zich kan aanmelden.
   3. Zet onder **Identity → Services** de optie **Git Gateway** aan.
   4. Nodig beheerders uit via **Identity → Invite users**.
5. Een uitgenodigde beheerder krijgt een e-mail, klikt op de link en kiest een wachtwoord. Daarna inloggen via `https://<jouw-site>.netlify.app/admin/`.

Elke wijziging in het CMS wordt een commit in GitHub. Netlify bouwt de site dan automatisch opnieuw (duurt ongeveer een minuut).

---

## Handleiding voor beheerders

### Inloggen

1. Ga naar `/admin/` op de site (bijvoorbeeld `https://<jouw-site>.netlify.app/admin/`).
2. Klik op **Inloggen met Netlify Identity** en vul je e-mailadres en wachtwoord in.
3. Je ziet nu het overzicht met **Nieuws**, **Clubs**, **Trainingen**, **Team** en **Lidmaatschappen**.

### Een nieuwsbericht plaatsen

1. Klik links op **Nieuws** en daarna op **Nieuw Nieuwsbericht**.
2. Vul de **Titel**, **Datum**, een korte **Samenvatting** en de **Tekst** in.
3. Voeg eventueel een **Afbeelding** toe en beschrijf die kort bij **Beschrijving afbeelding**.
   Gebruik geen foto’s van echte personen zonder toestemming.
4. Klik rechtsboven op **Publiceren → Nu publiceren**.
5. Na ongeveer een minuut staat het bericht op de site.

### Een Engelse vertaling toevoegen

1. Open het bericht (of de club, training of het lidmaatschap).
2. Bovenaan zie je de tabbladen **NL** en **EN**. Klik op **EN**.
3. Vul de Engelse tekst in. Velden zoals datum, plaats, afbeelding en prijs vul je maar één keer in.
   Die worden automatisch voor beide talen gebruikt.
4. Klik op **Publiceren**.

Laat je de Engelse versie leeg? Dan toont de Engelse site de Nederlandse tekst, met de melding
*“This text has not been translated yet.”*. Je hoeft dus niet alles meteen te vertalen.

### Teamleden

Onder **Team** beheer je de trainers, begeleiders en bestuursleden op de pagina “Ons team”.
Kies bij **Groep** of iemand bij de technische staf, de begeleiding of het bestuur hoort.
Een **Foto** is optioneel: zonder foto toont de site de initialen. Plaats alleen een foto als de persoon daar toestemming voor heeft gegeven.

### Prijzen van lidmaatschappen

Elk lidmaatschap heeft een **Prijs per jaar** en een vinkje **Prijs publiek tonen** (standaard uit).

- **Uit**: de publieke site toont alleen wat het lidmaatschap inhoudt, met de tekst
  *“De kosten bespreken we na het gesprek met de trainer.”* Het bedrag staat alleen in de ledenomgeving.
- **Aan**: het bedrag staat ook op de publieke pagina “Voor ouders”. Zet dit alleen aan als het bestuur daartoe besluit.

> Let op: de ledenomgeving is in deze proof of concept een **demo met nep-login**. Omdat de site
> statisch is, staan de bedragen technisch gewoon in de pagina. Voor een echte ledenomgeving is een
> aparte inlogdienst of een link naar een bestaand ledensysteem nodig.

---

## Projectstructuur

```
public/admin/          Decap CMS (index.html + config.yml)
public/images/         placeholder-afbeeldingen en uploads uit het CMS
src/content/           content per collectie, met een map per taal (nl/, en/)
src/content.config.ts  velden per collectie (moet overeenkomen met config.yml)
src/i18n/              adressen per taal (routes.ts), interfaceteksten (ui.ts), hulpfuncties
src/layouts/           basislayout met header, footer en hreflang-tags
src/components/        herbruikbare onderdelen (nieuwskaart, rooster, formulier, ...)
src/views/             inhoud per pagina, gedeeld door NL en EN
src/pages/             dunne bestanden per adres, NL in de hoofdmap en EN in en/
src/styles/            huisstijl (tokens.css) en algemene opmaak
```

### Een nieuwe pagina toevoegen (voor ontwikkelaars)

1. Voeg het adres toe aan `src/i18n/routes.ts`, met een NL- en EN-variant.
2. Maak de inhoud in `src/views/NieuwePagina.astro`.
3. Maak twee dunne pagina’s in `src/pages/` en `src/pages/en/` die de view laden.
4. Zet de pagina eventueel in het menu via `src/components/Header.astro`.

---

*Proof of concept, gebouwd met Claude Code. Alle namen en gegevens zijn fictief.*
