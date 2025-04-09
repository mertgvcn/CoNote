namespace CoNote.Core.Exceptions;
public class UndeletableEntityException : BaseException
{
    public UndeletableEntityException(string message = "This entity cannot be deleted.") : base(message, 400)
    {
    }
}