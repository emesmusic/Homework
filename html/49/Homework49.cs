using System.Threading.Channels;
namespace Homework49
    {
    //There's a struct System.Drawing.Color that already does color but you told me to define so...
    public enum Color
        {
        Black,
        White,
        Red,
        Green,
        Blue,
        Purple
        }
   
    public enum Pattern
        {
        Striped,
        Checked,
        Plain,
        Geometric
        }

    internal class Shirt
        {
        public Shirt(Color color, Pattern pattern)
            {
            Color = color;
            Pattern = pattern;
            }

        public Color Color { get; set; }
        public Pattern Pattern { get; set; }

        public override string ToString()
            {
            return $"Color: {Color}, Pattern: {Pattern}";
            }
        }


    internal class Homework49
        {

        static void Main(string[] args)
            {
            List<Shirt> shirtList = new List<Shirt>();

            foreach (Color color in typeof(Color).GetEnumValues()) {
                foreach (Pattern pattern in typeof(Pattern).GetEnumValues()) {
                    shirtList.Add(new Shirt(color, pattern));
                    }
                }

            Console.WriteLine(String.Join('\n', shirtList));

            }
       
        }
    }
