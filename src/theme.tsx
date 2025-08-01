import { extendTheme } from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";

const theme = extendTheme({
  colors: {
    brand: {
      50: "#e6f2f0",
      100: "#cce5e1",
      200: "#99cbc3",
      300: "#66b2a5",
      400: "#339987",
      500: "#007f6a",  // Primary calming green
      600: "#006655",
      700: "#004d40",
      800: "#00332b",
      900: "#001a15",
    },
    text: {
      light: "#2D3748",
      dark: "#EDF2F7",
    },
  },
  fonts: {
    heading: `'Poppins', sans-serif`,
    body: `'Open Sans', sans-serif`,
  },
  styles: {
    global: (props: Record<string, any>) => ({
      body: {
        bg: mode("#f7fafc", "#1A202C")(props),  // Light/Dark mode backgrounds
        color: mode("gray.800", "gray.100")(props),
        lineHeight: "base",
      },
    }),
  },
  components: {
    Button: {
      baseStyle: {
        borderRadius: "xl",
        fontWeight: "medium",
      },
      defaultProps: {
        colorScheme: "brand",
      },
    },
    Input: {
      baseStyle: {
        field: {
          borderRadius: "md",
        },
      },
    },
    Textarea: {
      baseStyle: {
        borderRadius: "md",
      },
    },
  },
  config: {
    initialColorMode: "light",
    useSystemColorMode: false,
  },
});

export default theme;
