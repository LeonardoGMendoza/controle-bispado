import os

replacements = {
    "Serenya": "Bispado",
    "SERENYAHOMECARE": "BISPADO",
    "serenya": "bispado",
    "SERENYA": "BISPADO",
    "serenyahomecare": "controle-bispado",
    "Serenyahomecare": "Controle-bispado"
}

for root, dirs, files in os.walk("."):
    if ".git" in root or "node_modules" in root or ".next" in root:
        continue
    for file in files:
        if file.endswith((".js", ".jsx", ".json", ".md", ".env", ".prisma", ".ts", ".css")):
            filepath = os.path.join(root, file)
            try:
                with open(filepath, "r", encoding="utf-8") as f:
                    content = f.read()
                original_content = content
                for k, v in replacements.items():
                    content = content.replace(k, v)
                if content != original_content:
                    with open(filepath, "w", encoding="utf-8") as f:
                        f.write(content)
                    print(f"Updated: {filepath}")
            except Exception as e:
                print(f"Error reading {filepath}: {e}")
