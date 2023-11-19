create extension if not exists citext;

create table if not exists public.products(
  id bigserial primary key,
  name citext not null,
  price float not null,
  inventory int not null,
  created_at timestamp default now(),
  updated_at timestamp default now()
);

create table if not exists public.commande(
  id bigserial primary key,
  status citext not null,
  prix_total float not null,
  created_at timestamp default now(),
  updated_at timestamp default now()
);

