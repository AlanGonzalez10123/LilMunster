using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("[controller]")]
public class PetController : ControllerBase
{
    [HttpPost("chat")]
    public IActionResult Chat([FromBody] ChatMessage message)
    {
        // Here you would process the message, potentially using an AI service
        // For now, we'll just return a simple response
        return Ok(new { response = $"Your pet heard: {message.Text}" });
    }
}

public class ChatMessage
{
    public string Text { get; set; }
}