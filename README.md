# MySQLTD2CSC
**MySQL Table Design to CSharp Class**

---

> ⚠️ **ATTENTION:** This is a developer tool intended only for testing and should **never** be used in a production environment!

---

## Usage
1. Enter your MySQL data in `config.json`.  
2. Run the converter with the following command:  
   ```bash
   node index.js TABLE_NAME
   ```

**Example output:**
`node index.js shops`
```csharp
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
This small tool was created to simplify the process of generating classes needed for the Entity Framework in C#.  
  
Sharing is caring!  
Feel free to improve the code if you'd like. 😊
