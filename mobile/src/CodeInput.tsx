import { Text } from "react-native-paper";
import { CodeField, Cursor, useBlurOnFulfill } from "react-native-confirmation-code-field";
import { useContext, useState } from "react";
import { ThemeContext } from "./Theme";

const CELL_COUNT = 6;

const CodeInput = ({onSubmit}:propsType) => {
  const [value, setValue] = useState("");
  const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
  const { theme } = useContext(ThemeContext);

  const onChangeText = (text:string)=>{
    setValue(text)
    if(text.length===CELL_COUNT) onSubmit(text);
  }

  return (
    <CodeField
      ref={ref}
      value={value}
      onChangeText={onChangeText}
      cellCount={CELL_COUNT}
      rootStyle={{ marginTop: 20 }}
      keyboardType="number-pad"
      renderCell={({ index, symbol, isFocused }) => (
        <Text
          key={index}
          style={[{
            width: 40,
            height: 40,
            lineHeight: 38,
            fontSize: 24,
            borderWidth: 2,
            marginHorizontal: 4,
            borderColor: theme.colors.border,
            textAlign: "center"
          }, isFocused && {
            borderColor: theme.colors.primary
          }]}
        >
          {symbol || (isFocused ? <Cursor /> : null)}
        </Text>
      )}
    />
  );
};

type propsType = {
  onSubmit: (code:string)=>void
}

export default CodeInput;