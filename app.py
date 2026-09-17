from flask import Flask, render_template, jsonify
from sklearn.metrics.pairwise import cosine_similarity
from sklearn.feature_extraction.text import TfidfVectorizer
import pandas as pd

app = Flask(__name__)

df = pd.read_csv('products_194.csv')
df.loc[df['brand'].isna(), 'brand'] = '-'
tfid = TfidfVectorizer(stop_words='english')

df['features'] = (df['category'] + ' ' + df['brand'] + ' ' + df['tags'] + ' ' + df['description'])
fet = tfid.fit_transform(df['features'])
cosin = cosine_similarity(fet)


@app.route('/')
def index():
    return render_template('index.html')

@app.route('/item')
def item():
    return jsonify(
        df.to_dict('records')
    )

@app.route('/product/<int:idx>')
def product(idx):
    return render_template('product.html')

@app.route('/api/rec/<int:idx>')
def rec(idx):
    prod = df[df['product_id']==idx]

    if prod.empty:
        return jsonify(
            {'error': 'Product not found'}
        ), 404
    index = prod.index[0]
    hasil = list(enumerate(cosin[index]))

    hasil = sorted(hasil, key=lambda x:x[1], reverse=True)

    rec = []

    for i, j in hasil[1:15]:
        prd = df.iloc[i].to_dict()
        prd['similarity'] = float(j)
        rec.append(prd)

    return jsonify(rec)

@app.route('/api/product/<int:idx>')
def info(idx):
    prod = df[df['product_id']==idx]
    return jsonify(
        prod.to_dict('records')
    )

    



if __name__ == '__main__':
    app.run(debug=True)