namespace CoNote.Core.Exceptions;
public class SecretKeyIsNotConfiguredException : BaseException
{
    public SecretKeyIsNotConfiguredException(string message = "Secret key is not configured.") : base(message, 500)
    {
    }
}

