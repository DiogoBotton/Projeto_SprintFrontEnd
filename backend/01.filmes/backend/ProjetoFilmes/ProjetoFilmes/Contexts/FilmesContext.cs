﻿using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace ProjetoFilmes.Domains
{
    public partial class FilmesContext : DbContext
    {
        public FilmesContext()
        {
        }

        public FilmesContext(DbContextOptions<FilmesContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Filme> Filmes { get; set; }
        public virtual DbSet<Genero> Generos { get; set; }
        public virtual DbSet<Usuario> Usuarios { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                optionsBuilder.UseSqlServer("Data Source=senaivagas-azuredb.database.windows.net;Initial Catalog=FilmesDB;User Id=wolf;Password=legoshi@123");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Filme>(entity =>
            {
                entity.HasKey(e => e.IdFilme);

                entity.HasIndex(e => e.Titulo)
                    .HasName("UQ__Filmes__7B406B565B214CD5")
                    .IsUnique();

                entity.Property(e => e.Titulo)
                    .IsRequired()
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.HasOne(d => d.IdGeneroNavigation)
                    .WithMany(p => p.Filmes)
                    .HasForeignKey(d => d.IdGenero)
                    .HasConstraintName("FK__Filmes__IdGenero__3B75D760");
            });

            modelBuilder.Entity<Genero>(entity =>
            {
                entity.HasKey(e => e.IdGenero);

                entity.HasIndex(e => e.Nome)
                    .HasName("UQ__Generos__7D8FE3B2417C4675")
                    .IsUnique();

                entity.Property(e => e.Nome)
                    .IsRequired()
                    .HasMaxLength(255)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<Usuario>(entity =>
            {
                entity.HasKey(e => e.IdUsuario);

                entity.HasIndex(e => e.Email)
                    .HasName("UQ__Usuarios__A9D10534B6127995")
                    .IsUnique();

                entity.Property(e => e.Email)
                    .IsRequired()
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.Nome)
                    .IsRequired()
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.Permissao)
                    .IsRequired()
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.Senha)
                    .IsRequired()
                    .HasMaxLength(255)
                    .IsUnicode(false);
            });
        }
    }
}
