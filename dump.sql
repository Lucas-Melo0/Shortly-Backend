--
-- PostgreSQL database dump
--

-- Dumped from database version 12.12 (Ubuntu 12.12-0ubuntu0.20.04.1)
-- Dumped by pg_dump version 12.12 (Ubuntu 12.12-0ubuntu0.20.04.1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: sessions; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.sessions (
    id integer NOT NULL,
    "userId" integer,
    token text NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL
);


--
-- Name: sessions_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.sessions_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: sessions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.sessions_id_seq OWNED BY public.sessions.id;


--
-- Name: urls; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.urls (
    id integer NOT NULL,
    url text NOT NULL,
    shorturl text NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL
);


--
-- Name: urls_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.urls_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: urls_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.urls_id_seq OWNED BY public.urls.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.users (
    id integer NOT NULL,
    name text NOT NULL,
    email text NOT NULL,
    password text NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL
);


--
-- Name: usersUrls; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."usersUrls" (
    id integer NOT NULL,
    "userId" integer,
    "urlId" integer,
    "visitCount" integer NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL
);


--
-- Name: usersUrls_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."usersUrls_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: usersUrls_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."usersUrls_id_seq" OWNED BY public."usersUrls".id;


--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: sessions id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.sessions ALTER COLUMN id SET DEFAULT nextval('public.sessions_id_seq'::regclass);


--
-- Name: urls id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.urls ALTER COLUMN id SET DEFAULT nextval('public.urls_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Name: usersUrls id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."usersUrls" ALTER COLUMN id SET DEFAULT nextval('public."usersUrls_id_seq"'::regclass);


--
-- Data for Name: sessions; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.sessions VALUES (1, 3, '5f412ff6-a12f-47df-9a8c-e5a24553e47f', '2022-10-16 15:11:57.52626');
INSERT INTO public.sessions VALUES (2, 1, '2c4d7057-90ee-434c-838a-03fa0375484b', '2022-10-16 17:58:31.732919');
INSERT INTO public.sessions VALUES (3, 1, 'c8495a3e-2a86-4b23-a471-679955e8aaa0', '2022-10-16 17:59:21.416251');
INSERT INTO public.sessions VALUES (4, 1, 'fa42067e-b14f-4c94-bdd2-4e1eeec994e2', '2022-10-16 18:02:00.540063');
INSERT INTO public.sessions VALUES (5, 4, 'a056ccd5-8dca-4ffe-8917-1135e6aba25d', '2022-10-16 18:06:18.334287');
INSERT INTO public.sessions VALUES (6, 5, 'db75bccf-e01d-4f63-a71e-32b5d8113e98', '2022-10-16 18:13:40.531367');
INSERT INTO public.sessions VALUES (7, 5, '809f2c57-ad14-4530-a0ee-c8fddb8c12c1', '2022-10-16 18:18:44.700329');
INSERT INTO public.sessions VALUES (8, 5, 'd79ac05a-7620-4f96-98e3-faff7b3065d7', '2022-10-16 18:34:03.55867');
INSERT INTO public.sessions VALUES (9, 5, 'af246992-7342-4046-83e6-390339668422', '2022-10-16 18:36:07.430151');


--
-- Data for Name: urls; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.urls VALUES (2, 'https://www.globo.com/23455', 'j2EYPL1x9p', '2022-10-16 15:12:05.348992');
INSERT INTO public.urls VALUES (5, 'https://uol.com.br@hotmail', 'Hkp74a8guH', '2022-10-16 18:14:19.052873');
INSERT INTO public.urls VALUES (7, 'https://www.globo.com/', 'zJ54upgjFG', '2022-10-16 18:19:30.552954');
INSERT INTO public.urls VALUES (8, 'https://www.tagravando.com', 'AWQJN6RL4C', '2022-10-16 18:19:48.359965');
INSERT INTO public.urls VALUES (12, 'https://www.twoandahalfman.com', 'ezByKdaDqv', '2022-10-16 18:23:07.664506');


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.users VALUES (1, '123', '123', '$2b$10$LUcFdexgQLoFPIwn4dZxbOIUSDrpVn.XiowN3mq4DAR5susk0o6KC', '2022-10-16 15:09:27.736559');
INSERT INTO public.users VALUES (2, '321', '321', '$2b$10$R2ztfyxM1fWRjeDVSwEjZePhW4dTujmkTT4maCvBeba720CPRMglK', '2022-10-16 15:11:24.008431');
INSERT INTO public.users VALUES (3, '1', '1', '$2b$10$5zI33qcfURyykAvnLL.h8eqMkSyLE.3l.xqy2sVHatab81Og4srCC', '2022-10-16 15:11:53.708177');
INSERT INTO public.users VALUES (4, 'l', 'l', '$2b$10$5mIoLrrzsE.WiAJE5M0lQu4/ALeu2nZMeCj5R3Q.av295O/R9mJ6G', '2022-10-16 18:06:14.804876');
INSERT INTO public.users VALUES (5, 'testando', 'testando', '$2b$10$yroNGrPteCDUMYUstFKeNe9cXThYkBpP0PwjTp86yglxseKGYkKBy', '2022-10-16 18:13:03.512839');


--
-- Data for Name: usersUrls; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public."usersUrls" VALUES (7, 5, 7, 955, '2022-10-16 18:19:30.55693');
INSERT INTO public."usersUrls" VALUES (2, 3, 2, 1, '2022-10-16 15:12:05.350098');
INSERT INTO public."usersUrls" VALUES (8, 5, 8, 953, '2022-10-16 18:19:48.361481');
INSERT INTO public."usersUrls" VALUES (12, 5, 12, 953, '2022-10-16 18:23:07.666053');
INSERT INTO public."usersUrls" VALUES (5, 5, 5, 959, '2022-10-16 18:14:19.057851');


--
-- Name: sessions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.sessions_id_seq', 9, true);


--
-- Name: urls_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.urls_id_seq', 12, true);


--
-- Name: usersUrls_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."usersUrls_id_seq"', 12, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.users_id_seq', 5, true);


--
-- Name: sessions sessions_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.sessions
    ADD CONSTRAINT sessions_pkey PRIMARY KEY (id);


--
-- Name: urls urls_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.urls
    ADD CONSTRAINT urls_pkey PRIMARY KEY (id);


--
-- Name: usersUrls usersUrls_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."usersUrls"
    ADD CONSTRAINT "usersUrls_pkey" PRIMARY KEY (id);


--
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- Name: users users_name_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_name_key UNIQUE (name);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: sessions sessions_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.sessions
    ADD CONSTRAINT "sessions_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users(id);


--
-- Name: usersUrls usersUrls_urlId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."usersUrls"
    ADD CONSTRAINT "usersUrls_urlId_fkey" FOREIGN KEY ("urlId") REFERENCES public.urls(id);


--
-- Name: usersUrls usersUrls_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."usersUrls"
    ADD CONSTRAINT "usersUrls_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users(id);


--
-- PostgreSQL database dump complete
--

