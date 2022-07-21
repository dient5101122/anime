# -*- coding: utf-8 -*-

import pandas as pd
import numpy as np
import scipy as sp
from sklearn.metrics.pairwise import cosine_similarity
import operator

# anime = pd.read_csv('./assets/dataset/anime.csv')
rating = pd.read_csv('./assets/dataset/rating.csv')
anime = pd.read_csv('./assets/dataset/anime1.csv')

rating.rating.replace({-1: np.nan}, regex=True, inplace=True)

anime_tv = anime[anime['type'] == 'TV']


merged = rating.merge(anime_tv, left_on='anime_id',
                      right_on='anime_id', suffixes=['_user', ''])
merged.rename(columns={'rating_user': 'user_rating'}, inplace=True)


merged = merged[['user_id', 'name', 'user_rating']]
merged_sub = merged[merged.user_id <= 10000]


piv = merged_sub.pivot_table(index=['user_id'], columns=[
                             'name'], values='user_rating')

piv_norm = piv.apply(lambda x: (x-np.mean(x))/(np.max(x)-np.min(x)), axis=1)


piv_norm.fillna(0, inplace=True)
piv_norm = piv_norm.T
piv_norm = piv_norm.loc[:, (piv_norm != 0).any(axis=0)]

piv_sparse = sp.sparse.csr_matrix(piv_norm.values)

item_similarity = cosine_similarity(piv_sparse)
# user_similarity = cosine_similarity(piv_sparse.T)


item_sim_df = pd.DataFrame(
    item_similarity, index=piv_norm.index, columns=piv_norm.index)
# user_sim_df = pd.DataFrame(
#     user_similarity, index=piv_norm.columns, columns=piv_norm.columns)


def top_animes(anime_name):
    result = []
    count = 1
    print('Similar shows to {} include:\n'.format(anime_name))
    for item in item_sim_df.sort_values(by=anime_name, ascending=False).index[1:11]:
        # print('No. {}: {}'.format(count, item))
        result.append(item)
        count += 1

    return result


def process_data_animes(anime_name):
    animes = top_animes(anime_name)
    result = []

    for i in range(12294):
        if anime['name'][i] in animes:
            result.append({
                'anime_id': anime['anime_id'][i],
                'name': anime['name'][i],
                'genre': anime['genre'][i],
                'type': anime['type'][i],
                'episodes': anime['episodes'][i],
                'rating': anime['rating'][i],
                'members': anime['members'][i],
                'image': str('http://localhost:8000/static/' + anime['images'][i]),
                # 'images': 'https://th.bing.com/th/id/R.8c10347c0c2076d0e195c6fd9414bae9?rik=0EFgd9Q%2fX5lBnA&riu=http%3a%2f%2ftous-logos.com%2fwp-content%2fuploads%2f2018%2f02%2fCouleur-logo-Netflix.jpg&ehk=oLdx1Tt1M83wUyb93AuErMnEoNAXHVH7xCUZH7mcjqE%3d&risl=&pid=ImgRaw&r=0',
                'videos': anime['videos'][i],
            })

    return result


def get_data_anime(name):
    result = []
    data = anime

    for i in range(len(data)):
        if str(data['name'][i]) == str(name):
            result.append({
                'anime_id': data['anime_id'][i],
                'name': data['name'][i],
                'genre': data['genre'][i],
                'type': data['type'][i],
                'episodes': data['episodes'][i],
                'rating': data['rating'][i],
                'members': data['members'][i],
                'image': str('http://localhost:8000/static/' + data['images'][i]),
                # 'images': 'https://th.bing.com/th/id/R.8c10347c0c2076d0e195c6fd9414bae9?rik=0EFgd9Q%2fX5lBnA&riu=http%3a%2f%2ftous-logos.com%2fwp-content%2fuploads%2f2018%2f02%2fCouleur-logo-Netflix.jpg&ehk=oLdx1Tt1M83wUyb93AuErMnEoNAXHVH7xCUZH7mcjqE%3d&risl=&pid=ImgRaw&r=0',
                'videos': data['videos'][i],
            })
    return result


# def predicted_rating(anime_name, user):
#     sim_users = user_sim_df.sort_values(by=user, ascending=False).index[1:1000]
#     user_values = user_sim_df.sort_values(
#         by=user, ascending=False).loc[:, user].tolist()[1:1000]
#     rating_list = []
#     weight_list = []
#     for j, i in enumerate(sim_users):
#         rating = piv.loc[i, anime_name]
#         similarity = user_values[j]
#         if np.isnan(rating):
#             continue
#         elif not np.isnan(rating):
#             rating_list.append(rating*similarity)
#             weight_list.append(similarity)
#     return sum(rating_list)/sum(weight_list)


# watched = piv.T[piv.loc[3, :] > 0].index.tolist()

# errors = []
# for i in watched:
#     actual = piv.loc[3, i]
#     predicted = predicted_rating(i, 3)
#     errors.append((actual-predicted)**2)

# np.mean(errors)
