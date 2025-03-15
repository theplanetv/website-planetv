{
  description = "Nix flake for website-planetv";

  inputs = { nixpkgs.url = "github:nixos/nixpkgs?ref=nixos-unstable"; };

  outputs = { self, nixpkgs }:
    let
      supportedSystems = [ "x86_64-linux" "aarch64-linux" ];

      forAllSystems = nixpkgs.lib.genAttrs supportedSystems;

      nixpkgsFor = forAllSystems (system: import nixpkgs { inherit system; });
    in {
      devShells = forAllSystems (system:
        let pkgs = nixpkgsFor.${system};
        in {
          default = with pkgs;
            mkShell {
              nativeBuildInputs = [
                # Rust
                cargo
                clang
                diesel-cli

                go
                nodejs

                # Other tools
                dbeaver-bin
                scc
              ];
            };
        });
    };
}

