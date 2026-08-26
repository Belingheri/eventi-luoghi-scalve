# Guida Passo-Passo: Come Mettere Online a Costo Zero il Portale "Val di Scalve"

Questa guida ti accompagnerà passo dopo passo nel processo di pubblicazione online del sito web. Grazie all'architettura sviluppata, **l'hosting ed il funzionamento online saranno 100% GRATUITI e senza canoni mensili o annuali**.

---

## 📋 Panoramica dei Passaggi

1. **Passo 1:** Caricare il codice su **GitHub** (Gratuito)
2. **Passo 2:** Collegare e Pubblicare su **Vercel** (Hosting Gratuito Illimitato)
3. **Passo 3 (Opzionale):** Attivare il Database Cloud Gratuito su **Supabase**
4. **Passo 4 (Opzionale):** Collegare un Dominio Personalizzato (es. `valdiscalveturismo.it`)

---

## 🛈 PASSO 1: Caricare il Codice su GitHub

Per permettere alla piattaforma di hosting gratuita di scaricare il sito e tenerlo aggiornato automaticamente, pubblichiamo il codice su un repository privato o pubblico di GitHub.

### 1.1 Se hai già l'utility GitHub CLI (`gh`):
Apri il terminale nella cartella del progetto (`/home/cmartin/Projects/Eventi Scalve`) ed esegui:
```bash
gh repo create val-di-scalve-turismo --public --source=. --remote=origin --push
```

### 1.2 Oppure tramite il sito GitHub.com:
1. Vai su [GitHub.com](https://github.com) ed effettua l'accesso (o crea un account gratuito).
2. Clicca sul pulsante verde **"New"** in alto a destra per creare un nuovo Repository.
3. Nome Repository: `val-di-scalve-turismo`.
4. Seleziona **Public** oppure **Private** e clicca su **"Create repository"**.
5. Nel terminale locale esegui i comandi indicati da GitHub:
   ```bash
   git remote add origin https://github.com/IL_TUO_USERNAME/val-di-scalve-turismo.git
   git branch -M main
   git push -u origin main
   ```

---

## 🚀 PASSO 2: Pubblicare il Sito GRATIS su Vercel

[Vercel](https://vercel.com) è la piattaforma di hosting leader mondiale per applicazioni React/Vite. Offre un **piano "Hobby" gratuito a vita** con certificato SSL HTTPS automatico e banda ultra-veloce su rete CDN mondiale.

1. Vai su [Vercel.com](https://vercel.com) e clicca su **"Sign Up"**.
2. Seleziona **"Continue with GitHub"** per accedere istantaneamente con il tuo account GitHub.
3. Dalla Dashboard di Vercel, clicca sul pulsante **"Add New..."** -> **"Project"**.
4. Cerca il repository `val-di-scalve-turismo` appena creato e clicca su **"Import"**.
5. Nella schermata di configurazione:
   * **Framework Preset:** Selezionerà automaticamente **Vite**.
   * **Root Directory:** `./`
   * **Build Command:** `npm run build`
   * **Output Directory:** `dist`
6. Clicca sul pulsante verde **"Deploy"**.

🎉 **Fatto!** In meno di 30 secondi il tuo sito sarà **LIVE** online con un indirizzo web gratuito HTTPS tipo:  
👉 `https://val-di-scalve-turismo.vercel.app`

> ℹ️ *Ogni volta che in futuro farai una modifica al codice su GitHub, Vercel aggiornerà automaticamente il sito online in tempo reale!*

---

## 🗄️ PASSO 3 (Opzionale): Attivare il Cloud Database Gratuito su Supabase

Il sito funziona già al 100% salvando le modifiche fatte dall'Admin nel browser. Se vuoi che le modifiche fatte dall'Admin siano **sincronizzate online in cloud per tutti i dispositivi**:

1. Vai su [Supabase.com](https://supabase.com) e registrati gratuitamente (**"Start your project"**).
2. Clicca su **"New Project"**, scegli un nome (es. `val-di-scalve-db`) e imposta una password per il DB. Seleziona la regione europea (es. *Frankfurt*).
3. Nel menu di sinistra di Supabase, vai su **SQL Editor** ed esegui questo script per creare le due tabelle:
   ```sql
   -- Tabella Luoghi
   create table places (
     id text primary key,
     category text,
     municipality text,
     image text,
     coordinates text,
     map_url text,
     rating numeric,
     featured boolean,
     title jsonb,
     description jsonb,
     practical_info jsonb
   );

   -- Tabella Eventi
   create table events (
     id text primary key,
     date text,
     time text,
     location text,
     municipality text,
     image text,
     organizer text,
     title jsonb,
     description jsonb
   );

   -- Abilita la Row Level Security (RLS)
   alter table places enable row level security;
   alter table events enable row level security;

   -- Permetti la Lettura Pubblica a tutti i visitatori (Turisti)
   create policy "Lettura pubblica luoghi" on places for select using (true);
   create policy "Lettura pubblica eventi" on events for select using (true);

   -- Permetti Inserimento, Modifica ed Eliminazione solo agli Amministratori Autenticati LATO BACKEND
   create policy "Modifica solo admin autenticati luoghi" on places for all using (auth.role() = 'authenticated');
   create policy "Modifica solo admin autenticati eventi" on events for all using (auth.role() = 'authenticated');
   ```

4. **Creare l'Utente Amministratore nel Backend Supabase:**
   * Nella Dashboard Supabase, vai nella scheda **Authentication** -> **Users** -> clicca su **"Add user"** -> **"Create user"**.
   * Inserisci la tua Email Amministratore (es. `admin@valdiscalve.it`) e la tua Password Segreta.
   * Da questo momento, solo chi conosce queste credenziali potrà autenticarsi tramite il backend di Supabase per modificare o eliminare eventi e luoghi!

5. Vai in **Project Settings** -> **API** e copia i due valori:
   * `Project URL`
   * `API Key (anon/public)`
6. Vai nella Dashboard di Vercel, entra nel tuo progetto `val-di-scalve-turismo` -> **Settings** -> **Environment Variables** ed inserisci:
   * `VITE_SUPABASE_URL` = (il tuo Project URL)
   * `VITE_SUPABASE_ANON_KEY` = (la tua anon key)
7. Fai il redeploy su Vercel o fai un nuovo commit: il sito passerà istantaneamente al database cloud protetto da validazione backend!

---

## 🌐 PASSO 4 (Opzionale): Collegare un Dominio Personalizzato

Se possiedi o vuoi acquistare un dominio (es. `valdiscalveturismo.it` su Register, Aruba, Namecheap o Cloudflare):

1. Su Vercel, vai in **Settings** -> **Domains**.
2. Scrivi il tuo dominio (es. `valdiscalveturismo.it`) e clicca su **"Add"**.
3. Vercel ti mostrerà i record DNS da inserire nel pannello del tuo dominio (un record `A` indirizzato a `76.76.21.21` o un `CNAME`).
4. In pochi minuti Vercel genererà gratuitamente ed in automatico il certificato di sicurezza **SSL HTTPS (il lucchetto verde)** per il tuo dominio!

---

### 🔑 Accesso al Pannello Amministratore (`/admin`)
* **URL Pannello:** `/admin` (oppure cliccando sull'icona lucchetto nell'header del sito)
* **Autenticazione:** Tramite gli utenti registrati nella sezione **Authentication -> Users** della tua Dashboard Supabase.
