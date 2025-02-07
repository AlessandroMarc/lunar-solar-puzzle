import { getDefaultConfig } from "expo/metro-config";

const config = await getDefaultConfig(__dirname); // Use await here

config.transformer.babelTransformerPath = "./metro-transformer.js"; // No need for require.resolve
config.resolver.assetExts = config.resolver.assetExts.filter(ext => ext !== "svg");
config.resolver.sourceExts.push("svg");

config.transformer.getTransformOptions = async () => ({
	transform: {
		experimentalImportSupport: false,
		inlineRequires: false
	}
});

config.resolver.sourceExts.push("js", "jsx", "ts", "tsx");

export default config; // Use export default
