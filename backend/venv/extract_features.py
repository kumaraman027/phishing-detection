def extract_features(url):
    return [
        len(url),
        url.count('https'),
        url.count('.'),
        url.count('/'),
        1 if '@' in url else 0
    ]
