# Select Stack Profile

## Goal

Choose the narrowest stack profile that matches the repository after ANR initialization.

## Steps

1. classify the repository as application, firmware, infrastructure, or mixed
2. pick the closest profile from `profiles/`
3. merge only the relevant `AGENTS.fragment.md` content into `AGENTS.md`
4. add the profile's recommended docs before feature work expands
5. remove any copied guidance that does not match the actual repository

## Rule

Profiles are starting points. They are not licenses to import irrelevant structure.
