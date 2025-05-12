import { styled } from "@mui/material";

const ColorPickerStyled = styled("input")(({ theme }) => ({
  width: 40,
  height: 40,
  backgroundColor: theme.palette.background.paper,
  border: `1px solid ${theme.palette.primary.main}`,
  borderRadius: theme.shape.borderRadius,
  cursor: "pointer",
  "&:hover": {
    borderColor: theme.palette.primary.dark,
  },
}));

type ColorPickerPropsType = {
  value: string;
  onChange: any;
};

const ColorPicker = ({ value, onChange }: ColorPickerPropsType) => {
  return (
    <ColorPickerStyled
      type="color"
      defaultValue={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
};

export default ColorPicker;
