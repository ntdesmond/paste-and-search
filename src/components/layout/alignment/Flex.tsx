import styled, { css } from 'styled-components';

interface FlexBoxProps {
  gap?: string;
  justify?: string;
  align?: string;
  height?: string;
  width?: string;
  textAlign?: string;
}

const Flex = styled.div<FlexBoxProps>`
  display: flex;
  ${({ gap, align, justify, height, width, textAlign }) => {
    let settings = css``;
    if (gap) {
      settings = css`
        ${settings}
        gap: ${gap};
      `;
    }
    if (align) {
      settings = css`
        ${settings}
        align-items: ${align};
      `;
    }
    if (justify) {
      settings = css`
        ${settings}
        justify-content: ${justify};
      `;
    }
    if (width) {
      settings = css`
        ${settings}
        width: ${width};
      `;
    }
    if (height) {
      settings = css`
        ${settings}
        height: ${height};
      `;
    }
    if (textAlign) {
      settings = css`
        ${settings}
        text-align: ${textAlign};
      `;
    }
    return settings;
  }};
`;

export const FlexColumn = styled(Flex)`
  flex-direction: column;
`;

export const FlexRow = styled(Flex)`
  flex-direction: row;
`;
