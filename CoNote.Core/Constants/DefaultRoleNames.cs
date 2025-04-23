namespace CoNote.Core.Constants;
public static class DefaultRoleNames
{
    public const string Owner = "Owner";
    public const string Editor = "Editor";
    public const string Viewer = "Viewer";

    public static readonly List<string> All = new() { Owner, Editor, Viewer };
}
