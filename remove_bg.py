from PIL import Image

def remove_black_background(input_path, output_path, threshold=20):
    img = Image.open(input_path).convert("RGBA")
    data = img.getdata()
    
    nuevo_data = []
    for item in data:
        # Extraemos RGB
        if item[0] < threshold and item[1] < threshold and item[2] < threshold:
            nuevo_data.append((0, 0, 0, 0)) # Transparente completo
        else:
            nuevo_data.append(item) # Mantenemos igual
            
    img.putdata(nuevo_data)
    img.save(output_path, "PNG")

if __name__ == "__main__":
    remove_black_background(r"C:\Users\USER\.gemini\antigravity\brain\8b1146e2-352b-46f1-a8d1-dfe13cdcd53b\media__1774401760892.jpg", r"C:\Users\USER\Documents\APP PARA CAMBIOS JK CONVERSOR\public\logo-jk-transparente.png")
