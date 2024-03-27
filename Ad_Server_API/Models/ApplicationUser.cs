namespace Ad_Server_API.Models;

public class ApplicationUser
{
    public int UserId { get; set; }
    public string UserName { get; set; }
    public string UserAddress { get; set; }
    public string UserContractNumber { get; set; }
    public string UserEmail { get; set; }
    public int UserRoleId { get; set; }
}
