import * as React from "react";
const { useRef, useEffect, useState } = React;

import styled from "styled-components";

import Paper, { PaperProps } from "@material-ui/core/Paper";
import InputBase, { InputBaseProps } from "@material-ui/core/InputBase";
import IconButton, { IconButtonProps } from "@material-ui/core/IconButton";

const StyledPaper = styled(Paper as React.ComponentClass<PaperProps>)`
  padding: 2px 4px;
  display: flex;
  align-items: center;
  width: 400px;
`;

const StyledIconButton = styled(IconButton as React.ComponentClass<
  IconButtonProps
>)`
  padding: 10px;
`;

const StyledInput = styled(InputBase as React.ComponentClass<InputBaseProps>)`
  margin-left: 8px;
  flex: 1;
`;

interface Props {
  icon: React.ComponentElement<any, any>;
  onIconClicked?: () => void;
  onBackClicked?: () => void;
  onFocused?: () => void;
  autoFocus?: boolean;
}

const SearchTextAppBar: React.FC<Props> = props => {
  const { icon, onIconClicked, onFocused, autoFocus, ...others } = props;
  const ref = useRef(null);
  const [focused, setFocused] = useState(false);

  const onFocusListener = () => {
    setFocused(true);
    onFocused();
  };
  const onBlurListener = () => {
    setFocused(false);
  };

  useEffect(() => {
    if (onFocused) {
      ref.current.addEventListener("focus", onFocusListener);
      ref.current.addEventListener("blur", onBlurListener);
    }
    return () => {
      if (onFocused) {
        ref.current.removeEventListener("focus", onFocusListener);
        ref.current.removeEventListener("blur", onBlurListener);
      }
    };
  }, []);

  let appBarStyle = {};
  if (!focused) {
    appBarStyle = {
      ...appBarStyle,
      background: "transparent",
      boxShadow: "none"
    };
  }

  return (
    <StyledPaper elevation={1} {...others}>
      <StyledIconButton onClick={onIconClicked}>{icon}</StyledIconButton>
      <StyledInput
        placeholder="Search Spots"
        inputRef={ref}
        autoFocus={!!autoFocus}
      />
    </StyledPaper>
  );
};

export default SearchTextAppBar;
