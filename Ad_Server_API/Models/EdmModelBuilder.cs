using Microsoft.OData.Edm;
using Microsoft.OData.ModelBuilder;

namespace Ad_Server_API.Models;
public class EdmModelBuilder
{
    public static IEdmModel GetEdmModel()
    {
        var builder = new ODataConventionModelBuilder();
        builder.EntitySet<Publisher>("Publisher");
        builder.EntitySet<Advertiser>("Advertiser");

        EdmModel model = builder.GetEdmModel() as EdmModel;

        return model;
    }
}
