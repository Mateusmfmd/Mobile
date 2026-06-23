from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
# Esta configuração força a liberação de todas as origens e métodos
CORS(app, resources={r"/*": {"origins": "*"}})

@app.route('/executar_bat', methods=['GET', 'OPTIONS'])
def executar_bat():
    # Se for uma requisição de teste (OPTIONS), responde ok imediatamente
    if request.method == 'OPTIONS':
        return '', 200
        
    try:
        print(">>> CONEXÃO RECEBIDA COM SUCESSO! <<<")
        # subprocess.run(['seu_arquivo.bat'], shell=True) # Descomente quando tiver o .bat
        
        return jsonify({
            "success": True, 
            "message": "Sistema de hardware iniciado!"
        }), 200
    except Exception as e:
        print(f"Erro: {e}")
        return jsonify({"success": False, "message": str(e)}), 500

if __name__ == '__main__':
    # Rodando na porta 5000
    app.run(host='0.0.0.0', port=5000, debug=True)
