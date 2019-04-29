import * as React from "react";

import styled from "styled-components";

import Paper, { PaperProps } from "@material-ui/core/Paper";
import InputBase, { InputBaseProps } from "@material-ui/core/InputBase";
import IconButton, { IconButtonProps } from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";

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
  onMenuClicked: () => void;
}

const SearchTextAppBar: React.FC<Props> = props => {
  const { onMenuClicked, ...others } = props;

  return (
    <StyledPaper elevation={1} {...others}>
      <StyledIconButton onClick={onMenuClicked}>
        <MenuIcon />
      </StyledIconButton>
      <StyledInput placeholder="Search Spots" />
    </StyledPaper>
  );
};

export default SearchTextAppBar;
