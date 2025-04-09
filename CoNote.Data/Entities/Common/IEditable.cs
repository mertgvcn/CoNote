namespace CoNote.Core.Entities.Common;
public interface IEditable
{
    public string EditedBy { get; set; }
    public DateTime EditedAt { get; set; }
}
