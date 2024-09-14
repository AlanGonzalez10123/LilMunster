using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("[controller]")]
public class PetController : ControllerBase
{
    private static PETHHTracker _petTracker = new PETHHTracker(); // Create a static pet tracker instance

    [HttpPost("chat")]
    public IActionResult Chat([FromBody] ChatMessage message)
    {
        // Here you would process the message, potentially using an AI service
        // For now, we'll just return a simple response
        return Ok(new { response = $"Your pet heard: {message.Text}" });
    }

     [HttpPost("feed")]
        public IActionResult Feed()
        {
            _petTracker.Feed(); // Calling the Feed method from the PETHHTracker instance
            return Ok(new
            {
                message = "You fed the pet!",
                happiness = _petTracker.Happiness,
                hunger = _petTracker.Hunger
            });
        }

        // Endpoint to play with the pet
        [HttpPost("play")]
        public IActionResult Play()
        {
            _petTracker.Play(); // Calling the Play method from the PETHHTracker instance
            return Ok(new
            {
                message = "You played with the pet!",
                happiness = _petTracker.Happiness,
                hunger = _petTracker.Hunger
            });
        }

        // Endpoint to check pet status
        [HttpGet("status")]
        public IActionResult GetStatus()
        {
            return Ok(new
            {
                happiness = _petTracker.Happiness,
                hunger = _petTracker.Hunger
            });
        }

        // Endpoint to simulate passing time
        [HttpPost("pass-time")]
        public IActionResult PassTime()
        {
            _petTracker.PassTime(); // Calling the PassTime method from the PETHHTracker instance
            return Ok(new
            {
                message = "Time has passed for the pet.",
                happiness = _petTracker.Happiness,
                hunger = _petTracker.Hunger
            });
        }
    }

public class ChatMessage
{
    public string Text { get; set; } = string.Empty;
}
public class PETHHTracker
{
        private int happiness;
    private int hunger;

    // Property to get or set the happiness value
    public int Happiness
    {
        get { return happiness; }
        private set
        {
            // Ensuring happiness is always between 0 and 100
            happiness = Math.Clamp(value, 0, 100);
        }
    }

    // Property to get or set the hunger value
    public int Hunger
    {
        get { return hunger; }
        private set
        {
            // Ensuring hunger is always between 0 and 100
            hunger = Math.Clamp(value, 0, 100);
        }
    }

    // Constructor to initialize the pet's stats
    public PETHHTracker()
    {
        Happiness = 50; // Starting happiness
        Hunger = 50;    // Starting hunger
    }

    // Method to feed the pet (decreases hunger)
    public void Feed()
    {
        Console.WriteLine("Feeding the pet...");
        Hunger -= 20;
        Happiness += 5; // Feeding also increases happiness
        PrintStatus();
    }

    // Method to play with the pet (increases happiness, increases hunger)
    public void Play()
    {
        Console.WriteLine("Playing with the pet...");
        Happiness += 10;
        Hunger += 15; // Playing makes the pet hungrier
        PrintStatus();
    }

    // Method to check pet status
    public void PrintStatus()
    {
        Console.WriteLine($"Current Happiness: {Happiness}");
        Console.WriteLine($"Current Hunger: {Hunger}");
        Console.WriteLine();
    }

    // Method to simulate time passing, which increases hunger and lowers happiness
    public void PassTime()
    {
        Console.WriteLine("Time is passing...");
        Hunger += 10;
        Happiness -= 5;
        PrintStatus();
    }
}
