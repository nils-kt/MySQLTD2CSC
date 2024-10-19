# MySQLTD2CSC
MySQL Table Design to CSharp Class.

---

> **ATTENTION:** This is only a small developer tool which should never be used in a productive environment! 

---

## How to use
Enter your MySQL data in config.json.  
Start the converter as follows: `node index.js shops`

**Result:**
```cs
[Table("shops")]
public class Shops {
    public int Id {get; set;}
    public double PosX {get; set;}
    public double PosY {get; set;}
    public double PosZ {get; set;}
    public double Heading {get; set;}
    public string Type {get; set;}
    public int InStock {get; set;}
    public int CreateBlip {get; set;}
}
```

## Why?
A small tool was needed which makes it easier to create the required classes for the Entity Framework using C#.
  
Sharing is caring. :)  
Feel free to improve the code further if you feel like it. 
