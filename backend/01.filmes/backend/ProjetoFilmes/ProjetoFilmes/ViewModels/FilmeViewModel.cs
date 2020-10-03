using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ProjetoFilmes.ViewModels
{
    public class FilmeViewModel
    {
        public int IdFilme { get; set; }
        public string Titulo { get; set; }
        public string Genero { get; set; }

        public FilmeViewModel(int idFilme, string titulo, string genero)
        {
            IdFilme = idFilme;
            Titulo = titulo;
            Genero = genero;
        }
    }
}
