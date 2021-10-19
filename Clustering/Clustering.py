import tensorflow as tf
import matplotlib.pyplot as plt
from sklearn.preprocessing import MinMaxScaler
from sklearn.decomposition import PCA
import pandas as pd
import numpy as np

class SOM:
    # Constructor

    def __init__(self, height, width, input_dimension, learning_rate):
        self.height = height 
        self.width = width 
        self.input_dimension = input_dimension 
        self.learning_rate = learning_rate 

        self.weight = tf.Variable(tf.random_normal([self.height * self.width, self.input_dimension]))

        self.input = tf.placeholder(tf.float32, [self.input_dimension])

        self.location = [tf.to_float([y,x]) for y in range(height) for x in range(self.width)]

        self.bmu = self.get_bmu()
        self.update = self.update_neighbor()

    #best matching unit
    def get_bmu(self):
        square = tf.square(self.input - self.weight)

        distance = tf.sqrt(tf.reduce_mean(square, axis=1))

        bmu_index = tf.argmin(distance)

        bmu_location = tf.to_float([tf.div(bmu_index, self.width), tf.mod(bmu_index, self.width)])

        return bmu_location

    #update weight
    def update_neighbor(self):
        
        square = tf.square(self.bmu - self.location)
        distance = tf.sqrt(tf.reduce_mean(square, axis=1))

        sigma = tf.to_float(tf.maximum(self.width, self.height)/2)

        neighbor_strength = tf.exp(tf.div(tf.negative(tf.square(distance)), 2 * tf.square(sigma)))

        rate = neighbor_strength * self.learning_rate

        stacked_rate = tf.stack([tf.tile(tf.slice(rate, [i], [1]), [self.input_dimension])
                                for i in range(self.width * self.height)])

        weight = stacked_rate * (self.input - self.weight)
        new_weight = self.weight + weight

        return tf.assign(self.weight, new_weight)

    def train(self, dataset, epoch):
        with tf.Session() as sess:
            sess.run(tf.global_variables_initializer())

            for i in range(epoch):
                print(i)
                for data in dataset:
                    sess.run(self.update, feed_dict = {self.input: data})

            location = sess.run(self.location)
            weight = sess.run(self.weight)

            self.cluster = [[] for i in range(self.height)]
            for i, loc in enumerate(location):
                self.cluster[int(loc[0])].append(weight[i])

            # sess.run(self.cluster)

def main():

    dataset = pd.read_csv("credit_card_general_clustering.csv")
    feature = dataset[["BALANCE", "BALANCE_FREQUENCY", "PURCHASES", "ONEOFF_PURCHASES", "PURCHASES_FREQUENCY", "ONEOFF_PURCHASES_FREQUENCY", "PURCHASES_TRX", "PAYMENTS", "MINIMUM_PAYMENTS", "PRC_FULL_PAYMENT", "TENURE"]]
    feature = feature.fillna(feature.mean())
    
    feature = MinMaxScaler().fit_transform(feature)
    pca = PCA(n_components=3)
    feature = pca.fit_transform(feature)

    height = 3
    width = 3

    input_dimension = 3

    learning_rate = 0.1

    epoch = 5000

    som = SOM(height, width, input_dimension, learning_rate)
    som.train(feature, epoch)
    # print(som.cluster)
    
    x, y, z = np.split(np.array(som.cluster), 3, axis=1)
    ax = plt.axes(projection="3d")
    ax.scatter3D(x, y, z, c=["red", "green", "blue", "yellow", "black", "purple", "gray", "orange", "pink"])
    plt.show()

if __name__ == '__main__':
    main()
